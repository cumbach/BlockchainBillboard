pragma solidity ^0.4.17;

import "./Ownable.sol";
import "./PixelStore.sol";

contract CanvasCore is PixelStore, Ownable {

    event BuyEvent();
    event RentEvent();
    event SquatEvent();
    event ManageEvent();

    address wallet;

    // Default set for  the cooldown times for buying and selling.
    // This can be modified in onlyOwner functions.
    uint buyCooldownTime = 10 seconds;
    uint rentCooldownTime = 10 seconds;

    /// Excess amount paid by the users is kept here and can be withdrawn.
    mapping (address => uint) amountToWithdraw;
    /// Default values for all pixelIds initially created and owned by the creators
    bool public defaultBuyable;
    uint public defaultPrice;

    uint public rentPrice = 10000000000000; // 0.1 e-4 ETH (1 cent / per pixel / per week)

    /// Transaction Fees
    uint buyingFees =  100000000000000; // 1e-4 ETH (10 cents / pixel)
    uint rentingFees =  50000000000000; // 0.5 e-4 ETH (5 cents / pixel)
    uint maintainFees = 10000000000000; // 0.1 e-4 ETH (1 cent / per week / per pixel)

    /// A dynamic list of pixels.
    uint[] pixelsInMarket; 

    /// Sets up the canvas with the total pixels (side * side)
    /// the default state of all pixels (all buyable or all unbuyable)
    /// and for each pixel owned by the creators, the default price of the pixel
    function CanvasCore(
            uint _totalPixels,
            bool _defaultBuyable,
            uint _defaultPrice,
            address _wallet)
            public PixelStore(_totalPixels, msg.sender)
    { 
        wallet = _wallet;
        if (wallet == 0)
            wallet = msg.sender; 
        defaultPrice = _defaultPrice; // in wei
        defaultBuyable = _defaultBuyable;
    }
    
    /// Returns true if the given pixelId is buyable
    // If it has a non-zero price, or it is owned by the creators of the
    // contract and defaultBuyable is true, then it returns true.
    function isBuyable(uint _pixelId) public view isValidPixelId(_pixelId) returns (bool) {
        if (pixels[_pixelId].price > 0)
            return true;
        if (pixels[_pixelId].owner == 0)
            return defaultBuyable;
        return false;
    }

    /// Returns true if the given pixelId is rentable: This happens when the pixel has an
    // owner and has been marked as rentable by its owner.
    function isRentable(uint _pixelId) public view isValidPixelId(_pixelId) returns (bool) {
      return (pixels[_pixelId].owner > 0 && pixels[_pixelId].rentable);
    }

    /// Returns true if the given pixelId is sqauttable: i.e. others can draw on it.
    // This happens if the pixel has an owner AND both its buy cooldown time (staleTime) 
    // and renting cooldown time (rentTime) have passed
    function isSquattable(uint _pixelId) public view isValidPixelId(_pixelId) returns (bool) {
        return (pixels[_pixelId].owner > 0 && 
                pixels[_pixelId].staleTime < now &&
                pixels[_pixelId].rentTime < now);
    }

    /// Returns the price of any pixelId
    function getPrice(uint _pixelId) public view isValidPixelId(_pixelId) returns (uint) {
        if (pixels[_pixelId].owner == 0 && defaultBuyable)
            return defaultPrice;

        return pixels[_pixelId].price;
    }

    /// Gets the current leaser of the provided pixelId
    // If the pixel's rent out period has expired then it returns the owner of the pixel
    function getLeaser(uint _pixelId) public view isValidPixelId(_pixelId) returns (address) {
        if (pixels[_pixelId].owner != 0) {
            if (pixels[_pixelId].rentTime >= now)
                return pixels[_pixelId].leaser;
            else 
                return pixels[_pixelId].owner;
        }
        return defaultOwner;
    }


    /// Takes in an array of pixelIds to buy. Also accepts payment.
    // Note: _buyCooldownWeeks is in weeks. 
    // Buys and charges user for all pixels buyable.
    // Sets that user as the owner and current leaser for those pixelIds
    // Puts the remaining money in amountToWithdraw
    // Supports All-Or-None: reverts transaction in case on the pixels isn't buyable
    function buyPixels(
        uint[] _pixelIds, 
        int32[] _colors, 
        uint128 _sellingPrice, 
        uint64 _buyCooldownWeeks,
        bool _rentable
    ) public payable
    {
        // Calculates the fees incurred for this buy based on the base buying fee 
        // and the weekly maintainence price. 
        uint buyAndMaintainFees = buyingFees + _buyCooldownWeeks * maintainFees;
        uint totalCost = 0;
        uint totalBuyingFees = 0;
        uint i;
        uint pixId;

        // This block checks if 
        // - the sender provided enough capital for the purchase.
        // - all the pixels are buyable at the time of mining of this transaction
        for (i = 0; i < _pixelIds.length; i++) {
            pixId = _pixelIds[i];
            if (isBuyable(pixId)) {
                totalCost += getPrice(pixId) + buyAndMaintainFees;
                totalBuyingFees += buyAndMaintainFees;
            } else {
                revert();
            }
        }

        uint amount = msg.value;
        require(amount >= totalCost);

        // Sets the staleTime, which is the time when the pixel is up for renting
        uint64 _staleTime = uint64(_buyCooldownWeeks * 1 weeks + now);

        // Updates the owner and metadata.
        for (i = 0; i < _pixelIds.length; i++) {
            pixId = _pixelIds[i];
            Pixel storage pixel = pixels[pixId];

            // This pixel is bought for the first time. 
            if (pixel.owner == 0) {
                pixelsInMarket.push(pixId);
            }
            pixel.owner = msg.sender;
            pixel.leaser = msg.sender;
            pixel.color = _colors[i];
            pixel.price = _sellingPrice;
            pixel.staleTime = _staleTime;
            pixel.rentable = _rentable;
            pixel.rentTime = 0;

            // Pay the selling price of this pixel to its owner
            amountToWithdraw[ownerOf(pixId)] += getPrice(pixId);
        }

        // Sets the excess funds in a withdrawAmount mapping.
        amountToWithdraw[msg.sender] += (amount - totalCost);

        // Pays buying fees to the wallet
        amountToWithdraw[wallet] += totalBuyingFees;

        BuyEvent();
    }


    /// Takes in an array of pixelIds to update. 
    // Also accepts maintainence fee to extend cooldown time.
    // Buys and charges user for all pixels manageable.
    // Puts the remaining money in amountToWithdraw
    // Doesn't supports All-Or-None: ignores pixels which the sender doesn't own.
    // NOTE: In case any field isn't change, the parameter should contain the previous value. 
    //       This code sets all valid pixels to have the new sellingPrice, adds to the cooldown 
    //       timer and sets if they are rentable or not as a bulk action. 
    function managePixels(
        uint[] _pixelIds, 
        int32[] _colors, 
        uint128 _sellingPrice, 
        uint64 _newCooldownWeeks,
        bool _rentable
    ) public payable
    {
        // Calculates the fees incurred for this buy based on the base buying fee 
        // and the weekly maintainence price. 
        uint maintainFees = _newCooldownWeeks * maintainFees;
        uint totalFees = 0;
        uint i;
        uint pixId;

        // This block checks if 
        // - the sender provided enough capital for the purchase.
        // - all the pixels are owned by the sender
        for (i = 0; i < _pixelIds.length; i++) {
            pixId = _pixelIds[i];
            if (getOwner(pixId) == msg.sender) {
                totalFees += maintainFees;
            }
        }

        uint amount = msg.value;
        require(amount >= totalFees);

        // Sets the excess funds in a withdrawAmount mapping.
        amountToWithdraw[msg.sender] += (amount - totalFees);

        // Pays buying fees to the wallet
        amountToWithdraw[wallet] += totalFees;

        // Updates the metadata.
        for (i = 0; i < _pixelIds.length; i++) {
            pixId = _pixelIds[i];
            if (getOwner(pixId) == msg.sender) {
                Pixel storage pixel = pixels[pixId];

                pixel.color = _colors[i];
                pixel.price = _sellingPrice;
                pixel.staleTime = max(pixel.staleTime, now) + (_newCooldownWeeks * 1 weeks);
                pixel.rentable = _rentable;
            }
        }

        ManageEvent();
    }


    /// Takes in an array of pixelIds to rent. This does not have extra fees
    // Sets color for all pixels if they are sqauttable. 
    // This does not support All-Or-None: it just squats all it can. 
    function squatPixels(uint[] _pixelIds, int32[] _colors)
        public
    {
        uint pixId;

        // Updates the owner and metadata.
        for (uint i = 0; i < _pixelIds.length; i++) {
            pixId = _pixelIds[i];
            Pixel storage pixel = pixels[_pixelIds[i]];
            if (isSquattable(pixId)) {
                pixel.color = _colors[i];
            }
        }
        SquatEvent();
    }


    /// Takes in an array of pixelIds to rent. Also accepts payment.
    // Rents and charges user for all pixels buyable.
    // Sets that user as the current leaser for those pixelIds
    // Puts the remaining money in amountToWithdraw
    // Supports All-Or-None: reverts transaction in case on the pixels isn't buyable
    function rentPixels(uint[] _pixelIds, int32[] _colors, uint rentCooldownWeeks)
        public
        payable
    {
        uint i;
        uint pixId;
        uint64 _rentedUntilTime = uint64(rentCooldownWeeks * 1 weeks + now);
        uint numPixels = _pixelIds.length;

        // This block checks if 
        // - the sender provided enough capital for renting.
        // - all the pixels are rentable at the time of mining of this transaction
        for (i = 0; i < numPixels; i++) {
            pixId = _pixelIds[i];
            if (!isRentable(pixId)) {
                revert();
            }
        }

        uint amount = msg.value;
        uint totalFees = (rentingFees + rentPrice) * numPixels;
        assert(amount >= totalFees);

        // Pays renting fees to the wallet
        amountToWithdraw[wallet] += rentingFees * numPixels;

        // Updates the owner and metadata.
        for (i = 0; i < numPixels; i++) {
            pixId = _pixelIds[i];
            Pixel storage pixel = pixels[pixId];

            pixel.leaser = msg.sender;
            pixel.color = _colors[i];
            pixel.rentTime = _rentedUntilTime;

            // Pay the renting price of this pixel to its owner
            amountToWithdraw[ownerOf(pixId)] += rentPrice;
        }

        // Sets the excess funds in a withdrawAmount mapping.
        amountToWithdraw[msg.sender] += (amount - totalFees);

        RentEvent();
    }


    // Returns all the pixels that have been bought. These ignores the pixels that have
    // not undergone any transaction and are owned by the creator
    // Returns <= totalPixels elements in each element
    function getCanvas() external view returns (uint[], int[], uint[], bool[], bool[], bool[]) {
        uint setPixels = pixelsInMarket.length;
        uint[] memory _pixelIds = new uint[](setPixels);
        int[] memory _colors = new int[](setPixels);
        uint[] memory _prices = new uint[](setPixels);
        bool[] memory _buyable = new bool[](setPixels);
        bool[] memory  _rentable = new bool[](setPixels);
        bool[] memory  _squattable = new bool[](setPixels);

        uint pixId;
        for (uint counter = 0; counter < setPixels; counter++) {
            pixId = pixelsInMarket[counter];
            _pixelIds[counter] = pixId;
            _colors[counter] = pixels[pixId].color;
            _prices[counter] = pixels[pixId].price;
            _buyable[counter] = isBuyable(pixId);
            _rentable[counter] = isRentable(pixId);
            _squattable[counter] = isSquattable(pixId);
        }

        return (_pixelIds, _colors, _prices, _buyable, _rentable, _squattable);
    }

    function withdraw() public {
        uint amount = amountToWithdraw[msg.sender];
        amountToWithdraw[msg.sender] = 0;

        if (!msg.sender.send(amount))
            amountToWithdraw[msg.sender] = amount;
    }
}
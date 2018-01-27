pragma solidity ^0.4.17;

import "./AbstractERC721.sol";

contract PixelStore is ERC721 {
    
    struct Pixel {
        address owner;

        // Leaser for each pixelId. If the pixel is not stale, the leaser
        // is the owner. If it is stale and rented, the leaser is the user who has
        // rented the pixel
        address leaser;
        uint128 price;
        // int32 color;
        int32 color;
        bool rentable

        // Time till when the pixel's maintainence is paid for
        uint64 staleTime;

        // Time till the pixel is leased to the leaser
        uint64 rentTime;
    }
    
    uint totalPixels;
    address defaultOwner;
        
    mapping (address => uint) ownershipPixelCount;
    mapping (uint => address) pixelIndexToApproved;
    mapping (uint => Pixel) public pixels;
    
    modifier isValidPixelId(uint _pixelId) {
        require(_pixelId >= 0 && _pixelId < totalPixels);
        _;
    }
        
    function PixelStore(uint _totalPixels, address _defaultOwner) public {
        defaultOwner = _defaultOwner;
        totalPixels = _totalPixels;
        ownershipPixelCount[defaultOwner] = totalPixels;
    }
        
    function totalSupply() public view returns (uint256 total) {
        total = totalPixels;
    }
    function balanceOf(address _owner) public view returns (uint256 balance) {
        balance = ownershipPixelCount[_owner];
    }
    function ownerOf(uint256 _pixelId) public view isValidPixelId(_pixelId) returns (address owner) {
        if (pixels[_pixelId].owner != 0) {
            return pixels[_pixelId].owner;
        }
        return defaultOwner;
    }
    
    function _transfer(address _from, address _to, uint256 _pixelId) internal {
        ownershipPixelCount[_to]++;
        pixels[_pixelId].owner = _to;
        pixels[_pixelId].leaser = _to;
        if (_from != address(0)) {
            ownershipPixelCount[_from]--;
            delete pixelIndexToApproved[_pixelId];
        }
        Transfer(_from, _to, _pixelId);
    }

    function _owns(address _claimant, uint256 _pixelId) internal view returns (bool) {
        return (ownerOf(_pixelId) == _claimant);
    }

    function _approvedFor(address _claimant, uint256 _pixelId) internal view returns (bool) {
        return pixelIndexToApproved[_pixelId] == _claimant;
    }

    function _approve(uint256 _pixelId, address _approved) internal {
        pixelIndexToApproved[_pixelId] = _approved;
    }

    function transfer(address _to, uint256 _pixelId) external isValidPixelId(_pixelId) {
        require(_to != address(0));
        require(_owns(msg.sender, _pixelId));
        _transfer(msg.sender, _to, _pixelId);
    }

    function approve(address _to, uint256 _pixelId) external isValidPixelId(_pixelId) {
        require(_owns(msg.sender, _pixelId));
        _approve(_pixelId, _to);
        Approval(msg.sender, _to, _pixelId);
    }

    function transferFrom(address _from, address _to, uint256 _pixelId) external isValidPixelId(_pixelId) {
        require(_to != address(0));
        require(_approvedFor(_to, _pixelId));
        require(_owns(_from, _pixelId));
        _transfer(_from, _to, _pixelId);
    }
}
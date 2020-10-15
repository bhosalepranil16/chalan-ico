// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.8.0;

import "./Chalan.sol";

contract ChalanICO {
    
    Chalan chalan;
    address payable owner;
    uint256 public chalanPrice = 1000000000000000;
    uint256 public chalanSold;
    
    constructor(Chalan _chalan) public {
        chalan = _chalan;
        owner = msg.sender;
    }
    
    function mint(uint256 _value) public payable returns(bool) {
        require(msg.value == multiply(chalanPrice, _value), "Please Send Correct Amount in wei");
        require(chalan.balanceOf(address(this)) >= _value, "Not Having enough tokens");
        require(chalan.transfer(msg.sender, _value));
        chalanSold += _value;
        return true;
    }
    
    function endSale() public payable {
        require(msg.sender == owner);
        require(chalan.transfer(owner, chalan.balanceOf(address(this))));
        owner.transfer(address(this).balance);
        selfdestruct(owner);
    }
    
    function multiply(uint x,uint y) internal pure returns(uint z){
        require(y == 0 || (z = x * y) / y == x);
    }
}
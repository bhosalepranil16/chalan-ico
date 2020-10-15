// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.8.0;

contract Chalan {
    
    string public name = "Chalan";
    string public symbol = "CLN";
    uint256 public totalSupply = 1000000;
    
    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;
    
    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    event Approval(address indexed _owner, address indexed _spender, uint256 _value);
    

    constructor() public {
        balanceOf[msg.sender] = totalSupply;
    }

    function transfer(address _to, uint256 _value) public returns (bool success) {
        require(balanceOf[msg.sender] >= _value, "Sender does not have enough tokens.");
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }
    
    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
        require(balanceOf[_from] >= _value, "Sender does not have enough tokens.");
        require(allowance[_from][msg.sender] >= _value, "Spender not allowed to spend this amount of token");
        allowance[_from][msg.sender] -= _value;
        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;
        return true;
    }
    
    function approve(address _spender, uint256 _value) public returns (bool success) {
        require(balanceOf[msg.sender] >= _value, "Sender does not have enough tokens.");
        allowance[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }
}
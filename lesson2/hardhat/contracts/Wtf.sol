// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./IERC20.sol";

contract WtfToken is IERC20 {
    string public override name;
    string public override symbol;
    uint8 public override decimals;
    uint256 public override totalSupply;
    mapping(address => uint256) public override balanceOf;
    mapping(address => mapping(address => uint256)) public override allowance;
    address public owner;

    constructor(
        string memory _name,
        string memory _symbol,
        uint8 _initDecimals,
        uint256 _initTotalSupply
    ) {
        name = _name;
        symbol = symbol;
        totalSupply = _initTotalSupply;
        owner = msg.sender;
        balanceOf[owner] = _initTotalSupply;
    }

    function transfer(address _to, uint256 _value)
        public
        override
        returns (bool)
    {
        require(balanceOf[msg.sender] >= _value, "Insufficient balance");

        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;

        emit Transfer(msg.sender, _to, _value);
        return true;
    }

    function transferFrom(
        address _from,
        address _to,
        uint256 _value
    ) public override returns (bool) {
        require(balanceOf[_from] >= _value, "reuqie enough balance");

        require(
            allowance[_from][msg.sender] >= _value,
            "Insufficient allowance"
        );

        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;
        allowance[_from][msg.sender] -= _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }

    function approve(address _spender, uint256 _value)
        external
        override
        returns (bool success)
    {
        require(balanceOf[msg.sender] >= _value, "Insufficient balance");
        allowance[msg.sender][_spender] = _value;

        emit Approval(msg.sender, _spender, _value);
        return true;
    }
}

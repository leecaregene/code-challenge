// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface ERC20 {
    function balanceOf(address account) external view returns (uint256);
}

contract TokenBalanceReader {
    struct Balance {
        address token;
        uint256 balance;
    }

    function getBalances(address wallet, address[] calldata tokens) external view returns (Balance[] memory) {
        uint256 tokenCount = tokens.length;
        Balance[] memory balances = new Balance[](tokenCount);

        for (uint256 i = 0; i < tokenCount; i++) {
            ERC20 token = ERC20(tokens[i]);
            uint256 balance = token.balanceOf(wallet);
            balances[i] = Balance({
                token: tokens[i],
                balance: balance
            });
        }

        return balances;
    }
}
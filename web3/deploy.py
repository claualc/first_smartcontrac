from solcx import compile_standard  # to compule solidity code
import json
from web3 import Web3
import os
from dotenv import load_dotenv

# load env vars
load_dotenv()

GANACHE_PROVIDER = os.getenv("GANACHE_PROVIDER")

PRIVATE_KEY = os.getenv("PRIVATE_KEY")

# get contract binary
with open("SimpleStorage.sol", "r") as file:
    simple_storage_file = file.read()

compiled_sol = compile_standard(
    {
        "language": "Solidity",
        "sources": {"SimpleStorage.sol": {"content": simple_storage_file}},
        "settings": {
            "outputSelection": {
                "*": {"*": ["abi", "metadata", "evm.bytecode", "evm.sourceMap"]}
            }
        },
    },
    solc_version="0.6.0",
)
# ABI - application building interface - will define the interface for SimplesStorage.sol

with open("compiled-code.json", "w") as file:
    json.dump(compiled_sol, file)


# DEPLOY THE CONTRACT

# get the bytecode
bytecode = compiled_sol["contracts"]["SimpleStorage.sol"]["SimpleStorage"]["evm"][
    "bytecode"
]["object"]

# get the abi
abi = compiled_sol["contracts"]["SimpleStorage.sol"]["SimpleStorage"]["abi"]

# JAVASCRIPT VM - to deploy and test local blockchain
# ganache - local Javascript VM with just one node
w3 = Web3(Web3.HTTPProvider(GANACHE_PROVIDER))

chain_id = 1337  # network id
my_adress = "0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1"
nonce = w3.eth.getTransactionCount(my_adress)

# DEPLOY

# contract
SimpleStorage = w3.eth.contract(abi=abi, bytecode=bytecode)

# state chain -> 1. build transaction -> 2. sign the transaction -> 3. send it
transaction = SimpleStorage.constructor().buildTransaction(
    {
        "chainId": chain_id,
        "from": my_adress,
        "nonce": nonce,
        "gasPrice": w3.eth.gas_price,
    }
)

#  2. sign the transaction
signed_txn = w3.eth.account.sign_transaction(transaction, private_key=PRIVATE_KEY)

# 3. send it
print("Deploying contract... f{}".format(my_adress))
tx_hash = w3.eth.send_raw_transaction(signed_txn.rawTransaction)
tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)  # wait sync for tx response
print("DONE")

# WORKIN WITH CONTRACT
# 1. CONTRACT ADRESS
# 2. CONTRACT ABI
simples_storage = w3.eth.contract(address=tx_receipt.contractAddress, abi=abi)
# Call -> DOESNT CHANGE THE STATE simulate making the call and getting a return value
# Transact -> CHANGES THE STATE (even if it is a view)

# intial val of favorite number
print("Updating contract...")
print(simples_storage.functions.retrieve().call())  # retrieve is a view
store_transaction = simples_storage.functions.store(12).build_transaction(
    {
        "chainId": chain_id,
        "from": my_adress,
        "nonce": nonce + 1,
        "gasPrice": w3.eth.gas_price,
    }
)
signed_store_tx = w3.eth.account.signTransaction(
    store_transaction, private_key=PRIVATE_KEY
)
# sended
store_tx_hash = w3.eth.sendRawTransaction(signed_store_tx.rawTransaction)
tx_receipt = w3.eth.waitForTransactionReceipt(store_tx_hash)
print("Updated")
print(simples_storage.functions.retrieve().call())

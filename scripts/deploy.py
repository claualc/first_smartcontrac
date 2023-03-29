from brownie import accounts, config, SimpleStorage, network


def deploy_simples_storage():
    print("Start Deploys")
    account = get_acount()
    # all transaction must have from value
    simples_storage = SimpleStorage.deploy({"from": account})
    print(simples_storage)

    # brownie detect if the functions must be a
    # 1. Call
    # 2. Transaction
    # this funciton is a view, therefor it will do a call
    stored_value = simples_storage.retrieve()
    print(stored_value)
    tx = simples_storage.store(12, {"from": account})
    tx.wait(1)
    stored_value = simples_storage.retrieve()
    print(stored_value)


def get_acount():

    # local ganache created account
    # account = accounts[0]

    # accoount with .evn PK
    # account = accounts.add(config["wallets"]["from_key"])

    # account from METAMASK
    # account = accounts.load("freecode-camp")

    if network.show_active() == "development":
        # this are the local ganache networks
        return accounts[0]  # local
    else:
        # remote - INFURA
        return accounts.add(config["wallets"]["from_key"])


def main():
    deploy_simples_storage()

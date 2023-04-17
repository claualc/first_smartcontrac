# the file name must start with test_
from brownie import accounts, SimpleStorage


def test_deploy():
    # Arrange
    account = accounts[0]
    # Act
    simple_storage = SimpleStorage.deploy({"from": account})
    starting_value = simple_storage.retrieve()
    expected = 0
    # Assert
    assert starting_value == expected


def test_updating_storage():
    # Arrange
    account = accounts[0]
    # Act
    simple_storage = SimpleStorage.deploy({"from": account})
    updatedVal = 12
    tx = simple_storage.store(updatedVal, {"from": account})
    tx.wait(1)
    actualVal = simple_storage.retrieve()
    # Assert
    assert actualVal == updatedVal

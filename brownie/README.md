# BROWNIE TESTEBENCH

To run it:

1. In local ganache network
```
brownie run .\scripts\deploy.py
```
2. In remote Infura network

- Set the Infura env variable
- Select the Infura network (rinkeby)
```
brownie run .\scripts\deploy.py --network rinkeby
```

To test it:
```
brownie test -pdb
```
-pdb hels to debug in cased of FAILURE (same flags as pytest)

To test only one func:
```
brownie test -k func_name
```

Files:

1. brownie-config.yalm: env variables (.env file)
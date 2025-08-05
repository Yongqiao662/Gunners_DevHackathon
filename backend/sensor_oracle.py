# sensor_oracle.py

import os
import time
import random
import json
from web3 import Web3
from dotenv import load_dotenv

# --- Load Environment Variables ---
load_dotenv()
PRIVATE_KEY = os.getenv("PRIVATE_KEY")
WEB3_PROVIDER_URL = os.getenv("WEB3_PROVIDER_URL")
CONTRACT_ADDRESS = os.getenv("CONTRACT_ADDRESS")
ACCOUNT_ADDRESS = os.getenv("ACCOUNT_ADDRESS")

# --- Connect to Blockchain ---
w3 = Web3(Web3.HTTPProvider(os.getenv("WEB3_PROVIDER_URL")))
# --- Smart Contract ABI ---
# You will get this from the Solidity developer. For now, use a placeholder.
# This ABI assumes your contract has an `updateFreshnessScore` function.
with open("abi.json", "r") as f:
    ABI = json.load(f)

# --- Connect to the blockchain ---

def simulate_and_update(nft_id):
    """Simulates a sensor reading and updates the freshness score on-chain if a breach occurs."""
    current_temp = random.uniform(5, 15)
    TEMP_THRESHOLD = 10

    print(f"\nMonitoring NFT ID: {nft_id} | Current Temperature: {current_temp:.2f}°C")

    if current_temp > TEMP_THRESHOLD:
        print("🚨 ALERT: Temperature breach detected! Updating freshness score.")
        new_score = 90
        
        nonce = w3.eth.get_transaction_count(ACCOUNT_ADDRESS)
        gas_price = w3.eth.gas_price

        transaction = freshchain_contract.functions.updateFreshnessScore(nft_id, new_score).build_transaction({
            'from': ACCOUNT_ADDRESS,
            'nonce': nonce,
            'gasPrice': gas_price
        })

        signed_tx = w3.eth.account.sign_transaction(transaction, private_key=PRIVATE_KEY)
        tx_hash = w3.eth.send_raw_transaction(signed_tx.rawTransaction)
        print(f"Transaction sent. Waiting for confirmation...")
        tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
        print(f"Transaction confirmed in block {tx_receipt.blockNumber}.")
    else:
        print("✅ Temperature is within the safe range.")

if __name__ == "__main__":
    print("Starting FreshChain Sensor Oracle...")
    nft_ids_to_monitor = [1, 2, 3, 4]
    while True:
        try:
            for nft_id in nft_ids_to_monitor:
                simulate_and_update(nft_id)
            time.sleep(30)
        except KeyboardInterrupt:
            print("\nExiting FreshChain Sensor Oracle.")
            break
        except Exception as e:
            print(f"An error occurred: {e}")
            time.sleep(30)
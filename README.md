# CoinHive-blocker
<p align="center">
  <img src="https://github.com/andreas0607/CoinHive-blocker/blob/master/ad.png" width="350"/>
</p>
 
Superlight script that removes coin-hive from all websites. The script both cancels all requests from coinhive and removes the script from the DOM before it loads.

### Please contribute to blacklist.json if you know miner-sites

* Update 0.8
    - Add CPU-load detection
    - Blacklist is now fetched from github (https://github.com/andreas0607/CoinHive-blocker/blob/master/blacklist.json)
    - Notification when consistant high CPU-load, fetches site-url and sends to dev for inspection
* Update 0.7
    - Remove welcome screen (it was annoying) 
* Update 0.6
    - Update list of miners to block
* Update 0.5
    - Creating statistics from blocked sites
    - Toggle to statistics display-mode
    - Welcome message
* Update 0.4
    - Toggle on and off the blocker by clicking the icon top left

* Update 0.3
    - Updating to block coin-hives new domain coinhive.com

-----------------------------------------------------------


Coin-Hive is:
"Coinhive offers a JavaScript miner for the Monero Blockchain (Why Monero?) that you can embed in your website. Your users run the miner directly in their Browser and mine XMR for you"

This means it steals your CPU power and slows your computer down.

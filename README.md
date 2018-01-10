###### CoinHive-Blocker
<p align="center">
  <img src="https://github.com/andreas0607/CoinHive-blocker/blob/master/ad.png" width="350" />
</p>

[![Chrome Web Store](https://img.shields.io/chrome-web-store/users/ccagdbjcbhmcdcbbknfebhhdbolnfimo.svg?style=flat-square)](https://chrome.google.com/webstore/detail/coin-hive-blocker/ccagdbjcbhmcdcbbknfebhhdbolnfimo)[![Maintenance](https://img.shields.io/maintenance/yes/2018.svg?style=flat-square)]()[![GitHub last commit](https://img.shields.io/github/last-commit/andreas0607/CoinHive-blocker.svg?style=flat-square)](https://github.com/andreas0607/CoinHive-blocker)

Superlight script that removes coin-hive from all websites. The script both cancels all requests from coinhive and removes the script from the DOM before it loads.

### Please contribute to blacklist.json if you know miner-sites
[here](https://github.com/andreas0607/CoinHive-blocker/blob/master/blacklist.json)
* Update 0.9
    - Add whitelist for reported sites to avoid unnecessary notifications  
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

# Cobblestone Stonescript for Stone Story RPG

My StoneScript code used in the ASCII-art game Stone Story (iOS version) to automate it.

Stone Story RPG includes a custom scripting language [Stonescript](https://stonestoryrpg.com/stonescript/) allowing automating player actions based on the game's state. This is done through the "Mind Stone" which is unlocked after beating the semi-final boss.

## Disclaimers
Stone Story RPG on Mobile (iOS & Android) has some minor differences, in particular no loading of external scripts.

The web import feature is currently not working very well

## Usage
### Copying
Copy [Cobblestone.txt](https://raw.githubusercontent.com/alexbarker234/stonescript/main/Cobblestone.txt)'s content into the in-game Mindstone UI.

### Web Import (janky and broken)
```
sys.cacheRemoteFiles = false
sys.SetFileUrl(
^"https://raw.githubusercontent.com/
^alexbarker234/stonescript/main/")
import Cobblestone
```
# Cobblestone - Stonescript for Stone Story RPG

My StoneScript code used in the ASCII-art game Stone Story (iOS version) to automate it.

Stone Story RPG includes a custom scripting language [Stonescript](https://stonestoryrpg.com/stonescript/) allowing automating player actions based on the game's state. This is done through the "Mind Stone" which is unlocked after beating the semi-final boss.

> [!WARNING]  
> I am still learning the mechanics of the game, this code is constantly changing and is likely not the best strategy

## Disclaimers
Stone Story RPG on Mobile (iOS & Android) has some minor differences, in particular no loading of external scripts.

The web import feature is currently not working very well

## Usage
Feel free to use & modify as you please

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

## Other Stonescript Repos
- [livercat - scribble](https://github.com/livercat/scribble/tree/main)
- [TheMatjaz](https://github.com/TheMatjaz/StoneScript/tree/master)
- [Eunomiac](https://github.com/Eunomiac/stone-story)

## Compiler
Since web imports are broken & mobile does not have importing from folders, I created a crude compiler that:
- Minifies (removes comments)
- Resolves local imports 
- Automatically uploads to my internet accessible website to copy to Stonestory on mobile

## Explanation
> [!WARNING]  
> This might not be fully up to date with what the script actually does
### Rocky Plateau
#### Miniboss - Arconian Scout
TODO
#### Boss - Dysangelos
##### Phase 1
- Use bardiche
##### Phase 2
- Use wand & shield that current state is weak to
##### Phase 3
- Use bardiche

### Deadwood Canyon
- <= 5★ will XP farm using experience potion
- \> 5★ will run normally using HP potion
#### Boss - Xyloalgia
- Bardiche
#### Boss - Poena
- Stunlock & mindstone dodge if must

### Caves of Fear 
### Mushroom Forest
### Haunted Halls
### Boiling Mine
### Icy Ridge
### Temple

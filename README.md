# Cobblestone - Stonescript for Stone Story RPG

My StoneScript code used in the ASCII-art game Stone Story (iOS version) to automate it.

Stone Story RPG includes a custom scripting language [Stonescript](https://stonestoryrpg.com/stonescript/) allowing automating player actions based on the game's state. This is done through the "Mind Stone" which is unlocked after beating the semi-final boss.

> [!WARNING]  
> I am still learning the mechanics of the game, this code is constantly changing and is likely not the best strategy

## Disclaimers
Stone Story RPG on Mobile (iOS & Android) has some minor differences, in particular no loading of external scripts.

The web import feature is currently not working very well.

## Usage
Feel free to use & modify as you please

### Copying
Either:
- Go to [RawPad](https://rawpad.up.railway.app/) and click the copy button to copy the full script
- Copy [Cobblestone.txt](https://raw.githubusercontent.com/alexbarker234/stonescript/main/Cobblestone.txt)
Paste the content into the in-game Mindstone UI.

### Web Import (janky and broken)
```
sys.cacheRemoteFiles = false
sys.SetFileUrl(
^"https://raw.githubusercontent.com/
^alexbarker234/stonescript/main/")
import Cobblestone
```

## RawPad 
Internet accessible website at https://rawpad.up.railway.app/ used to easily copy the Stonescript onto StoneStory mobile

## Compiler
Since web imports are broken & mobile does not have importing from folders, I created a crude compiler that:
- Minifies (removes comments)
- Resolves local imports in Main
- Automatically uploads to RawPad

The compiler currently doesn't support
- Nested or duplicate imports

## Useful Links
### Script GitHub Repos
- [livercat - scribble](https://github.com/livercat/scribble/tree/main)
- [TheMatjaz](https://github.com/TheMatjaz/StoneScript/tree/master)
- [Eunomiac](https://github.com/Eunomiac/stone-story)
- [asHOH](https://github.com/asHOH/Stonescript-for-Stone-Story-RPG/tree/master)
### Other 
- [Foe states](https://github.com/Hukutus/stone-script-reference)
- [Timewise](https://docs.google.com/spreadsheets/d/1s3VKhQfTcsVihIPGRHgRq-6VSwmFtNuyelh8OdkXzFo/edit?usp=sharing) - Input your offline times to see which is the best enchant farm location
- [Lunar phone book (Moondialling)](https://docs.google.com/spreadsheets/d/1OiiPNoB4bg0FBuW9si7GpYBoTzafNBGE10y_L324rKA/edit?usp=sharing) - Learn how moondialling works
- [Item Factory](https://docs.google.com/spreadsheets/d/14AwQNn11qSGf9aQAi89p5QEAKClMnJYvzfDXiuWHtGw/edit?usp=sharing) - See which enchants are best for your current level
## Explanation
> [!WARNING]  
> This might not be fully up to date with what the script actually does
### Rocky Plateau
- Hold Triskelion for speed & Compound Shield to block damage
- Hold Quest stone if standing still/waiting
- Always try dash to enemies, summon fire guy & use Quarterstaff dash

### Setup Run
- The first loop is a setup run where permapot is set up using the Lucky Potion by holding the mask

#### Miniboss - Arconian Scout
1. Chill with ice swords
2. Use healing swords if needed
3. [Moondial](https://docs.google.com/spreadsheets/d/1OiiPNoB4bg0FBuW9si7GpYBoTzafNBGE10y_L324rKA/edit?gid=1211455267#gid=1211455267) 2 fire swords

#### Boss - Dysangelos
##### Phase 1
1. Chill with ice swords
2. Use healing swords if needed up to 40hp
3. Moondial 2 fire swords
##### Phase 2
- Use 2 swords of the current weak element. Will moondial fire swords if it can
##### Phase 3
1. Chill with ice swords
2. Use healing swords if needed
3. Moondial 2 fire swords until resistance, then use other elemental swords.

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

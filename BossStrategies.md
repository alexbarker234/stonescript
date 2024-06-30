## Hrimnir 
Shovel strat, works on <= 5★

Essentially equip shovel when above 2 units away as it avoids the projectile
```
?foe.distance <= 2
    SetEquip("bardiche")
    TryBardicheAbility()
:?foe.distance <= 5
    SetEquip("shovel")
:?foe.distance > 5
    EquipDash()
```
import {
  CollectibleType,
  ModCallback,
  PlayerType,
} from "isaac-typescript-definitions";

const MOD_NAME = "alt-revives";
let reviveTimer = 45;

// This function is run when your mod first initializes.
export function main(): void {
  // Instantiate a new mod object, which grants the ability to add callback functions that
  // correspond to in-game events.
  const mod = RegisterMod(MOD_NAME, 1);

  // Register a callback function that corresponds to when a new player is initialized.
  mod.AddCallback(ModCallback.POST_UPDATE, revive);

  // Print a message to the "log.txt" file.
  Isaac.DebugString(`${MOD_NAME} initialized.`);
}

function revive() {
  const player = Isaac.GetPlayer();
  if (player.IsDead()) {
    for (reviveTimer = 45; reviveTimer >= 0; reviveTimer--) {
      continue;
    }
    if (reviveTimer === 0 && player.WillPlayerRevive()) {
      if (player.HasCollectible(CollectibleType.LAZARUS_RAGS)) {
        reviveAsTLazarus(player);
      } else if (player.HasCollectible(CollectibleType.JUDAS_SHADOW)) {
        reviveAsTJudas(player);
      }
    }
  }
}

function reviveAsTLazarus(player: EntityPlayer) {
  Isaac.DebugString("Player dead, reviving as Alive Tainted Lazarus...");
  print("Player dead, reviving as Alive Tainted Lazarus...");
  player.ChangePlayerType(PlayerType.LAZARUS_B);
  player.AddMaxHearts(-24, false);
  player.AddSoulHearts(-24);
  player.AddBlackHearts(-24);
  player.Revive();
  player.SetPocketActiveItem(CollectibleType.FLIP);
  player.AnimateCollectible(CollectibleType.LAZARUS_RAGS);
  player.RemoveCollectible(CollectibleType.LAZARUS_RAGS);
  player.AddHearts(6);
}

function reviveAsTJudas(player: EntityPlayer) {
  player.ChangePlayerType(PlayerType.JUDAS_B);
  player.AddMaxHearts(-24, false);
  player.AddSoulHearts(-24);
  player.AddBlackHearts(-24);
  player.Revive();
  player.AnimateCollectible(CollectibleType.JUDAS_SHADOW);
  player.RemoveCollectible(CollectibleType.JUDAS_SHADOW);
  player.AddBlackHearts(4);
}

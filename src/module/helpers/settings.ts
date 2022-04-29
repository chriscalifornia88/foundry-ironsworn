function reload() {
  window.location.reload()
}

export class IronswornSettings {
  static registerSettings() {
    game.settings.register('foundry-ironsworn', 'move-set', {
      name: 'IRONSWORN.Settings.MoveSet.Name',
      hint: 'IRONSWORN.Settings.MoveSet.Hint',
      scope: 'world',
      config: true,
      type: String,
      choices: {
        ironsworn: 'IRONSWORN.Settings.Ironsworn',
        starforged: 'IRONSWORN.Settings.Starforged',
      },
      default: 'ironsworn',
    })

    game.settings.register('foundry-ironsworn', 'oracle-set', {
      name: 'IRONSWORN.Settings.OracleSet.Name',
      hint: 'IRONSWORN.Settings.OracleSet.Hint',
      scope: 'world',
      config: true,
      type: String,
      choices: {
        ironsworn: 'IRONSWORN.Settings.Ironsworn',
        starforged: 'IRONSWORN.Settings.Starforged',
      },
      default: 'ironsworn',
    })

    game.settings.register('foundry-ironsworn', 'theme', {
      name: 'IRONSWORN.Settings.Theme.Name',
      hint: 'IRONSWORN.Settings.Theme.Hint',
      scope: 'world',
      config: true,
      type: String,
      choices: {
        ironsworn: 'IRONSWORN.Settings.Theme.Ironsworn',
        starforged: 'IRONSWORN.Settings.Theme.Starforged',
      },
      default: 'ironsworn',
      onChange: reload,
    })

    game.settings.register('foundry-ironsworn', 'shared-supply', {
      name: 'IRONSWORN.Settings.SharedSupply.Name',
      hint: 'IRONSWORN.Settings.SharedSupply.Hint',
      scope: 'world',
      config: true,
      type: Boolean,
      default: true,
    })

    game.settings.register('foundry-ironsworn', 'prompt-world-truths', {
      name: 'IRONSWORN.Settings.PromptTruths.Name',
      hint: 'IRONSWORN.Settings.PromptTruths.Hint',
      scope: 'world',
      config: true,
      type: Boolean,
      default: true,
    })

    game.settings.register('foundry-ironsworn', 'log-changes', {
      name: 'IRONSWORN.Settings.LogChanges.Name',
      hint: 'IRONSWORN.Settings.LogChanges.Hint',
      scope: 'world',
      config: true,
      type: Boolean,
      default: true,
    })

    game.settings.register('foundry-ironsworn', 'starforged-beta', {
      name: 'IRONSWORN.Settings.SFBeta.Name',
      hint: 'IRONSWORN.Settings.SFBeta.Hint',
      scope: 'world',
      config: true,
      type: Boolean,
      default: false,
      onChange: reload,
    })

    game.settings.register('foundry-ironsworn', 'data-version', {
      scope: 'world',
      config: false,
      type: Number,
      default: 1,
    })
  }

  static get theme(): string {
    return game.settings.get('foundry-ironsworn', 'theme') as string
  }

  static get starforgedBeta(): boolean {
    return game.settings.get('foundry-ironsworn', 'starforged-beta') as boolean
  }

  static get logCharacterChanges(): boolean {
    return game.settings.get('foundry-ironsworn', 'log-changes') as boolean
  }

  static async maybeSetGlobalSupply(value: number) {
    if (!game.settings.get('foundry-ironsworn', 'shared-supply')) return

    const actorsToUpdate = game.actors?.contents.filter((x) => ['character', 'shared'].includes(x.data.type)) || []
    for (const actor of actorsToUpdate) {
      await actor.update({ data: { supply: value } }, { suppressLog: true } as any)
    }
  }

  static async maybeSetGlobalCondition(name: string, value: boolean) {
    const actorsToUpdate = game.actors?.contents.filter((x) => ['character', 'starship'].includes(x.data.type)) || []
    console.log(actorsToUpdate)
    for (const actor of actorsToUpdate) {
      await actor.update({ data: { debility: { [name]: value } } }, { suppressLog: true } as any)
    }
  }
}

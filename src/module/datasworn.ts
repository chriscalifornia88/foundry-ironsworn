import { ItemDataConstructorData } from '@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/data.mjs/itemData'
import { IronswornActor } from './actor/actor'
import { IronswornItem } from './item/item.js'
import type { DelveSiteFeatureOrDanger } from './item/itemtypes'

const THEME_IMAGES = {
} as const

const THEME_IDS = {
	Ancient: '9RnSqMcrekJoJbXH',
	Corrupted: 'pKCYCvdI2WjjKsjY',
	Fortified: 'ONZWFYrqxgFIzppP',
	Hallowed: 'zhOq6bjCvYhXkMQB',
	Harrowed: '9BtnJYn9vXBGEV5R',
	Infested: 'H5aJvBKwPrbEnzMe',
	Ravaged: 'iDOVA8797p4kYar7',
	Wild: 'v3jYuNrr1Jt4TzNZ'
} as const

const DOMAIN_IMAGES = {
} as const

const DOMAIN_IDS = {
	Barrow: 'LIoWYBGBBMPlPNam',
	Cavern: 'QM2Y2Iop7fQ3yifB',
	'Frozen Cavern': '2c2t4chqfpZ9ydid',
	Icereach: 'hziNL2ikUkcPkd6A',
	Mine: 'HjxXUr5xrV1mobAO',
	Pass: '058BdtjZuW0pOLeE',
	Ruin: 'lkqTLuiB3g9dD7ed',
	'Sea Cave': 'jdJOGqg4DyEeCFg4',
	Shadowfen: 'Xn1xz4l3r6AMWzg8',
	Stronghold: 'Yy9KkvSOvB2tWxOp',
	Tanglewood: 'MbJlpR81C4Q4WDV2',
	Underkeep: 'vyyrG8pPtDQ6FAgG'
} as const

const FOE_IMAGES = {
} as const

const PACKS = [
	'foundry-ironsworn.ironswornoracles'
] as const

interface RawFeatureOrDanger {
	Chance: number
	Description: string
}

function importDelveFeaturesOrDangers(
	rawFeaturesOrDangers: RawFeatureOrDanger[],
	type: 'feature' | 'danger',
	sourceId: Item['id'] = null,
	low = 1
) {
	const result: DelveSiteFeatureOrDanger[] = []
	for (const featureOrDanger of rawFeaturesOrDangers) {
		result.push({
			range: [low, featureOrDanger.Chance],
			text: featureOrDanger.Description,
			flags: {
				'foundry-ironsworn': {
					type: `delve-site-${type}`,
					sourceId
				}
			}
		})
		low = featureOrDanger.Chance + 1
	}
	return result
}

export async function importFromDatasworn() {
	// Empty out the packs
	for (const key of PACKS) {
		const pack = game.packs.get(key)
		if (pack == null) continue

		// Unlock all the packs
		await pack.configure({ locked: false })

		// Delete all the contents
		const idsToDelete = pack.index.map((x) => x._id)
		await Item.deleteDocuments(idsToDelete, { pack: key })
	}

	// Themes
	const themesJson = await fetch(
		'systems/foundry-ironsworn/assets/delve-themes.json'
	).then(async (x) => await x.json())
	const themesToCreate = themesJson.Themes.map((rawTheme) => {
		const _id = THEME_IDS[rawTheme.Name]
		const themeData = {
			_id,
			type: 'delve-theme',
			name: rawTheme.Name,
			img: THEME_IMAGES[rawTheme.Name],
			system: {
				summary: rawTheme.Summary,
				description: rawTheme.Description,
				features: importDelveFeaturesOrDangers(
					rawTheme.Features,
					'feature',
					_id,
					1
				),
				dangers: importDelveFeaturesOrDangers(
					rawTheme.Dangers,
					'danger',
					_id,
					1
				)
			}
		}

		return themeData
	})
	await Item.createDocuments(themesToCreate, {
		pack: 'foundry-ironsworn.ironsworndelvethemes',
		keepId: true
	})

	// Domains
	const domainsJson = await fetch(
		'systems/foundry-ironsworn/assets/delve-domains.json'
	).then(async (x) => await x.json())
	const domainsToCreate = domainsJson.Domains.map((rawDomain) => {
		const _id = DOMAIN_IDS[rawDomain.Name]
		const domainData = {
			_id,
			type: 'delve-domain',
			name: rawDomain.Name,
			img: DOMAIN_IMAGES[rawDomain.Name],
			system: {
				summary: rawDomain.Summary,
				description: rawDomain.Description,
				features: importDelveFeaturesOrDangers(
					rawDomain.Features,
					'feature',
					_id,
					21
				),
				dangers: importDelveFeaturesOrDangers(
					rawDomain.Dangers,
					'danger',
					_id,
					31
				)
			}
		}

		return domainData
	})
	await Item.createDocuments(domainsToCreate, {
		pack: 'foundry-ironsworn.ironsworndelvedomains',
		keepId: true
	})

	// Lock the packs again
	for (const key of PACKS) {
		await game.packs.get(key)?.configure({ locked: true })
	}
}

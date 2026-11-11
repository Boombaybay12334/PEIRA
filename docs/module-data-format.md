# PEIRA module data format

Module data is static JSON validated during the Astro build. A file uses a
versioned `kind` and `schemaVersion` so future module formats can evolve without
silently changing the meaning of an existing export.

## Points v1

```json
{
  "kind": "points",
  "schemaVersion": 1,
  "demo": false,
  "figures": [],
  "omitted": [],
  "seed": 123,
  "inputs": {},
  "scenarios": [],
  "points": [
    {
      "id": "point-1",
      "time": "1813-10-16",
      "label": "Position",
      "place": "Place name",
      "lat": 51.3,
      "lon": 12.4,
      "unit": "people",
      "side": "coalition",
      "strength": { "low": 10, "high": 12, "unit": "people" },
      "source": ["SRC-01"],
      "confidence": "candidate",
      "status": "candidate",
      "scenario": "historical"
    }
  ]
}
```

`time` is an ISO date. `source` contains source identifiers, while the
essay's source list supplies the human-readable bibliography. `scenario`
defaults to `"historical"` when omitted. Scenario records are optional and use
`id`, `label`, `kind`, `assumptions`, `parameters`, `limitations`,
`exploration`, and an optional `summary`.

Demo files must set `demo: true` and be visibly labelled as synthetic. They are
not historical evidence.

`omitted` may contain either an identifier string or an object with `id` and
`reason` fields when an export needs to explain why a candidate point was left
out.

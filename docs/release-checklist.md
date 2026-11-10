# v1.0.0 release checklist (owner)

Run these only after Run J has merged and the live site on the custom domain looks right.

- [ ] Essay 001 is published (`draft: false`), reads well on a real phone, and every source listed is one I actually read
- [ ] Every figure I use is verified by me against its cited page, or is hedged as single-source in the text
- [ ] `docs/qa-report.md` has no unresolved serious items
- [ ] `docs/credits.md` covers every image, font, dataset, library and the map attribution
- [ ] Site code licence decided (the agent did not choose one for you)
- [ ] Custom domain loads over HTTPS; the www and apex forms both behave

Then:

```fish
cd ~/Desktop/PEIRA
git switch main; and git pull
gh release create v1.0.0 --title "PEIRA v1.0.0" --notes-file docs/release-notes-v1.0.0.md
```

# Essay frontmatter

Essays live in `src/content/essays/<slug>/index.mdx` and must include the
frontmatter fields enforced by `src/content/essay-schema.ts`.

| Field                          | Rule                                                                                   |
| ------------------------------ | -------------------------------------------------------------------------------------- |
| `title`, `slug`, `description` | Required; slug is lowercase kebab-case; description is 50–200 characters.              |
| `publishDate`, `updatedDate`   | Publish date is required; updated date is optional and cannot precede publish date.    |
| `topics`                       | One or more of `wars`, `artifacts`, `paleo-bio`.                                       |
| `lens`                         | One or more of `ml`, `ai`, `security`.                                                 |
| `heroImage`                    | `src`, `alt`, `caption`, `credit`, and `license` are all required.                     |
| `sources`                      | At least one source with a title and supported kind.                                   |
| `repoUrl`                      | Required GitHub repository URL.                                                        |
| `lab`                          | Method, non-empty limitations, at least one data source, and one reproducibility item. |
| `draft`                        | Boolean, defaulting to `true`; drafts are excluded from production listings.           |

Run the schema tests and build with:

```sh
pnpm test
pnpm build
```

To demonstrate a build failure, copy a broken fixture's JSON frontmatter into
an MDX file under `src/content/essays/`, run `pnpm build`, and read the named
field in the error. Remove the temporary file and run `pnpm build` again.

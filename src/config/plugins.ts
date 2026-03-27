export interface Action {
  href: string
  name?: string
}

export interface Plugin extends Action {
  githubStars?: number
  npmDownloads?: number
}

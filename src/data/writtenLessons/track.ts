export type StudyTrack = 'both' | 'uzum' | 'yandex'

const TRACK_KEY = 'marketpro_study_track'

export function getStudyTrack(): StudyTrack {
  const raw = (typeof window !== 'undefined' ? localStorage.getItem(TRACK_KEY) : null) ?? 'both'
  if (raw === 'uzum' || raw === 'yandex' || raw === 'both') return raw
  return 'both'
}

export function setStudyTrack(track: StudyTrack) {
  if (typeof window === 'undefined') return
  localStorage.setItem(TRACK_KEY, track)
}

export function matchesTrack(platform: 'uzum' | 'yandex' | 'both', track: StudyTrack) {
  if (track === 'both') return true
  if (platform === 'both') return true
  return platform === track
}

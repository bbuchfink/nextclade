import { clamp } from 'lodash'

import type { QCInputData } from './runQC'

export interface QCRulesConfigMissingData {
  missingDataThreshold: number
  scoreWeight: number
  scoreBias: number
  scoreMax: number
}

export function ruleMissingData(
  { nucleotideComposition }: QCInputData,
  { missingDataThreshold, scoreWeight, scoreBias, scoreMax }: QCRulesConfigMissingData,
) {
  const totalMissing = nucleotideComposition.N ?? 0

  let scoreRaw = 0
  if (totalMissing > missingDataThreshold) {
    scoreRaw = totalMissing * scoreWeight - scoreBias
  }
  const score = clamp(scoreRaw, 0, scoreMax)

  return {
    score,
    totalMissing,
    missingDataThreshold,
  }
}
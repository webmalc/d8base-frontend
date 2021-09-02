import {
  ServiceConditionsInterface,
  ServiceDetailsInterface,
  ServiceEssentialsInterface,
  ServiceSummaryInterface,
} from '../interfaces';

export type StepState =
  | ServiceEssentialsInterface
  | ServiceDetailsInterface
  | ServiceConditionsInterface
  | ServiceSummaryInterface;

export type AggregatedState = Partial<ServiceEssentialsInterface> &
  Partial<ServiceDetailsInterface> &
  Partial<ServiceConditionsInterface> &
  Partial<ServiceSummaryInterface>;

import {FinalStepDataInterface} from '@app/service/interfaces/final-step-data-interface';
import {StepFiveDataInterface} from '@app/service/interfaces/step-five-data-interface';
import {StepFourDataInterface} from '@app/service/interfaces/step-four-data-interface';
import {StepOneDataInterface} from '@app/service/interfaces/step-one-data-interface';
import {StepSevenDataInterface} from '@app/service/interfaces/step-seven-data-interface';
import {StepSixDataInterface} from '@app/service/interfaces/step-six-data-interface';
import {StepThreeDataInterface} from '@app/service/interfaces/step-three-data-interface';
import {StepTwoDataInterface} from '@app/service/interfaces/step-two-data-interface';

export type StepDataInterfaceType = StepOneDataInterface | StepTwoDataInterface | StepThreeDataInterface | StepFourDataInterface |
    StepFiveDataInterface | StepSixDataInterface | StepSevenDataInterface | FinalStepDataInterface;

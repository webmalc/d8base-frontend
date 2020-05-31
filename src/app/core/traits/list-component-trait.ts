import {HelperService} from '@app/core/services/helper.service';

export abstract class ListComponentTrait {
    protected getDataToUpdate<T extends { id: number, professional?: number }>(data: T[], masterId: number, componentsList: T[]): T[] {
        const toUpdate: T[] = [];
        data.forEach(value => {
            if (componentsList[value.id]) {
                if (value.professional) {
                    value.professional = masterId;
                }
                toUpdate.push(value);
            }
        });

        return toUpdate;
    }

    protected getDataToCreate
    <T extends { id: number, professional?: number, start_date?: string, end_date?: string, date?: string }>
    (data: T[], masterId: number): T[] {
        const toCreate: T[] = [];
        data.forEach(value => {
            if (!value.id) {
                if (value.professional) {
                    value.professional = masterId;
                }
                if (value.start_date) {
                    value.start_date = value.start_date.slice(0, 10);
                }
                if (value.end_date) {
                    value.end_date = value.end_date.slice(0, 10);
                }
                if (value.date) {
                    value.date = value.date.slice(0, 10);
                }
                toCreate.push(value);
            }
        });

        return HelperService.cleanArray(toCreate);
    }

    protected getDataToDelete<T extends { id: number, professional?: number }>(data: T[], componentsList: T[]): T[] {
        const toDelete: T[] = [];
        const combinedArray: T[] = this.combineArray(data);
        for (const defaultValue of componentsList) {
            if (defaultValue && !combinedArray[defaultValue.id]) {
                toDelete.push(defaultValue);
            }
        }

        return HelperService.cleanArray(toDelete);
    }

    protected combineArray<T extends { id: number }>(data: T[]): T[] {
        const ret: T[] = [];
        data.forEach(value => ret[value.id] = value);

        return ret;
    }

    protected createHashArray<T extends { id: number }>(data: T[], componentsList: T[]): void {
        data.forEach(value => componentsList[value.id] = value);
    }

    protected abstract updateListAfterPost(element: any): void;
    protected abstract updateListAfterDelete(element: any): void;
}

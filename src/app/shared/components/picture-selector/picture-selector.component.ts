import {Component, forwardRef, OnInit, Provider} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

const VALUE_ACCESSOR: Provider = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => PictureSelectorComponent),
    multi: true
};

@Component({
    selector: 'app-picture-selector',
    templateUrl: './picture-selector.component.html',
    styleUrls: ['./picture-selector.component.scss'],
    providers: [VALUE_ACCESSOR]
})
export class PictureSelectorComponent implements ControlValueAccessor {

    private uri: string;

    private pictureGetter: string;

    private onChange = (value: any) => {};

    public setUri(uri: string) {
        this.uri = uri;
        this.onChange(this.uri);
    }

    public setPictureGetter(getter: string): void {
        this.pictureGetter = getter;
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
    }

    setDisabledState(isDisabled: boolean): void {
    }

    writeValue(uri: string): void {
        this.uri = uri;
    }



}

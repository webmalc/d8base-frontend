import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Tag} from '@app/master/models/tag';
import {TagsApiService} from '@app/master/services/tags-api.service';
import {BehaviorSubject} from 'rxjs';
import {first} from 'rxjs/operators';

@Component({
    selector: 'app-tags-select-input',
    templateUrl: './tags-select-input.component.html',
    styleUrls: ['./tags-select-input.component.scss'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => TagsSelectInputComponent),
        multi: true
    }]
})
export class TagsSelectInputComponent implements OnInit, ControlValueAccessor {

    public tagsList$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
    @Input() public masterId: number;
    public form: FormGroup;
    private onChange: (fn: any) => void;

    constructor(private api: TagsApiService, private formBuilder: FormBuilder) {
    }

    public ngOnInit(): void {
        this.api.getList().subscribe(
            data => this.tagsList$.next(this.getTagNamesArray(data.results))
        );
        this.api.getCurrentMasterTagsList(this.masterId).subscribe(
            data => {
                this.createForm(data.results);
                this.onChange(this.form.get('tagSelect').value);
            }
        );
    }

    public addTag(): void {
        this.tagsList$.pipe(
            first()
        ).subscribe(
            list => {
                const newOption: string = this.form.get('tagInput').value;
                this.form.get('tagInput').setValue('');
                if (this.isNewOptionUnique(list, newOption)) {
                    list.push(newOption);
                    this.tagsList$.next(list);
                    const selectedOptions: string[] = this.form.get('tagSelect').value;
                    selectedOptions.push(newOption);
                    this.form.controls.tagSelect.patchValue(selectedOptions);
                }
            }
        ).unsubscribe();
    }

    public selectChange(): void {
        this.onChange(this.form.get('tagSelect').value);
    }

    public registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    // tslint:disable:no-empty
    public registerOnTouched(fn: any): void {}

    public writeValue(data: string[]): void {}

    public setDisabledState(isDisabled: boolean): void {}

    private isNewOptionUnique(list: string[], newOption: string): boolean {
        for (const tag of list) {
            if (tag === newOption) {
                return false;
            }
        }

        return true;
    }

    private createForm(currentTags: Tag[]): any {
        this.form = this.formBuilder.group({
            tagSelect: [this.getTagNamesArray(currentTags)],
            tagInput: ['']
        });
    }

    private getTagNamesArray(tags: Tag[]): string[] {
        const arr: string[] = [];
        tags.forEach(tag => arr.push(tag.name));

        return arr;
    }
}

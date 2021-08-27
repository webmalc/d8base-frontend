import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { normalizeString } from '@app/core/functions/string.functions';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface TagModel {
  name: string;
}

@Component({
  selector: 'app-service-tags-editor',
  templateUrl: './service-tags-editor.component.html',
  styleUrls: ['./service-tags-editor.component.scss'],
})
export class ServiceTagsEditorComponent {
  @Output()
  public tagsChanged = new EventEmitter<TagModel[]>();

  public form: FormGroup;
  public tagNameControl: FormControl;
  public hasValue$: Observable<boolean>;
  private _tags: TagModel[] = [];

  constructor() {
    this.tagNameControl = new FormControl('');
    this.form = new FormGroup({
      tagName: this.tagNameControl,
    });
    this.hasValue$ = this.tagNameControl.valueChanges.pipe(map(Boolean));
  }

  public get tags(): TagModel[] {
    return this._tags;
  }

  @Input()
  public set tags(value: TagModel[]) {
    this._tags = value ?? [];
    this.tagsChanged.emit(this.tags);
  }

  public addTag() {
    const tagName = normalizeString(this.form.controls.tagName.value);
    if (!tagName) {
      return;
    }
    this.form.reset();

    if (this.hasTag(tagName)) {
      return;
    }
    this.tags = [...this.tags, { name: tagName }];
  }

  public removeTag(tag): void {
    this.tags = this.tags.filter(t => t.name !== tag.name);
  }

  private hasTag(name: string): boolean {
    return Boolean(this.tags.find(t => t.name === name));
  }
}

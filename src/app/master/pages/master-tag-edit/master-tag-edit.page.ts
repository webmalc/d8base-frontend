import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiListResponseInterface } from '@app/core/interfaces/api-list-response.interface';
import { MasterManagerService } from '@app/core/services/master-manager.service';
import { Tag } from '@app/master/models/tag';
import { TagsApiService } from '@app/master/services/tags-api.service';
import { forkJoin } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

@Component({
    selector: 'app-master-tag-edit',
    templateUrl: './master-tag-edit.page.html',
    styleUrls: ['./master-tag-edit.page.scss'],
})
export class MasterTagEditPage implements OnInit {

    public masterId: number;
    public form: FormGroup;
    private defaultTags: Tag[];

    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly api: TagsApiService,
        private readonly masterManager: MasterManagerService,
    ) {
    }

    public ngOnInit(): void {
        this.masterManager.getMasterList().pipe(
            tap(list => this.masterId = list[0].id),
            switchMap(
                list => this.api.getByMasterId(list[0].id),
            ),
        ).subscribe((list: ApiListResponseInterface<Tag>) => this.defaultTags = list.results);
        this.form = this.formBuilder.group({
            tags: [''],
        });
    }

    public submitForm(): void {

        const defaultArr: string[] = this.getTagNamesArray(this.defaultTags);
        const selected: string[] = this.form.get('tags').value;

        forkJoin([
            this.api.deleteList(defaultArr.filter(x => !selected.includes(x)).map((val: string) => this.getDefaultTagByName(val))),
            this.api.createList(selected.filter(x => !defaultArr.includes(x)).map((val: string) => this.getNewTag(val))),
        ]).subscribe(() => {
                // TODO: show feedback about operation success
            });
    }

    private getNewTag(tagName: string): Tag {
        const newTag = new Tag();
        newTag.name = tagName;
        newTag.professional = this.masterId;

        return newTag;
    }

    private getDefaultTagByName(name: string): Tag {
        for (const tag of this.defaultTags) {
            if (name === tag.name) {
                return tag;
            }
        }

        throw Error('unknown tag name');
    }

    private getTagNamesArray(tags: Tag[]): string[] {
        const arr: string[] = [];
        tags.forEach(tag => arr.push(tag.name));

        return arr;
    }
}

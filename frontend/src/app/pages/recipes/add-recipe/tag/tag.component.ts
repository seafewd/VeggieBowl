import { Component, OnInit } from '@angular/core';
import { Tag } from 'src/app/models/tag.model';
import { TagService } from 'src/app/services/tag.service';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent implements OnInit {

  tags: Tag[] = new Array();

  constructor(private tagService: TagService) { }

  ngOnInit(): void {
  }

  onAddTagClick(inputField: any) {
    if (inputField.value == "") return;
    const tag: Tag = new Tag(inputField.value);
    this.tags.push(tag);
    inputField.value = "";
  }

  onDeleteTagClick(tag: Tag) {
    if (!this.tags.find(t => t === tag)) return;
    this.tags.splice(this.tags.indexOf(tag), 1);
  }
}

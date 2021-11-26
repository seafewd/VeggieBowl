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
    this.tags.push(new Tag("#test"))
    this.tags.push(new Tag("#test2"))
    this.tags.push(new Tag("#test3"))
    this.tags.push(new Tag("#test4"))
  }

  getTags() {
    return this.tags;
  }

  onAddTagClick(inputField: any) {
    const value = inputField.value.replace(/\s/g, "");
    if (value == "")
      return;
    const tag: Tag = new Tag(value);
    if (!tag.text.startsWith("#"))
      tag.text = "#" + tag.text;
    this.tags.push(tag);
    inputField.value = "";
  }

  onDeleteTagClick(tag: Tag) {
    if (!this.tags.find(t => t === tag))
      return;
    this.tags.splice(this.tags.indexOf(tag), 1);
  }
}

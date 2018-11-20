import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material";
import { DropEffect, DndDropEvent } from "ngx-drag-drop";

@Component({
  selector: "app-vidraria",
  templateUrl: "./vidraria.component.html",
  styleUrls: ["./vidraria.component.scss"]
})
export class VidrariaComponent implements OnInit {
  ngOnInit() {}

  draggableListLeft = [
    {
      content: "Left",
      effectAllowed: "move",
      disable: false,
      handle: false
    },
    {
      content: "Lefter",
      effectAllowed: "move",
      disable: false,
      handle: false
    },
    {
      content: "Leftest",
      effectAllowed: "copyMove",
      disable: false,
      handle: false
    },
    {
      content: "Lefty",
      effectAllowed: "move",
      disable: false,
      handle: true
    },
    {
      content: "Left",
      effectAllowed: "move",
      disable: false,
      handle: false
    },
    {
      content: "Lefter",
      effectAllowed: "move",
      disable: false,
      handle: false
    },
    {
      content: "Leftest",
      effectAllowed: "copyMove",
      disable: false,
      handle: false
    },
    {
      content: "Lefty",
      effectAllowed: "move",
      disable: false,
      handle: true
    },
    {
      content: "Left",
      effectAllowed: "move",
      disable: false,
      handle: false
    },
    {
      content: "Lefter",
      effectAllowed: "move",
      disable: false,
      handle: false
    },
    {
      content: "Leftest",
      effectAllowed: "copyMove",
      disable: false,
      handle: false
    },
    {
      content: "Lefty",
      effectAllowed: "move",
      disable: false,
      handle: true
    },
    {
      content: "Left",
      effectAllowed: "move",
      disable: false,
      handle: false
    },
    {
      content: "Lefter",
      effectAllowed: "move",
      disable: false,
      handle: false
    },
    {
      content: "Leftest",
      effectAllowed: "copyMove",
      disable: false,
      handle: false
    },
    {
      content: "Lefty",
      effectAllowed: "move",
      disable: false,
      handle: true
    }
  ];

  draggableListRight = [
    {
      content: "I was originally right",
      effectAllowed: "move",
      disable: false,
      handle: false
    }
  ];
  layout: any;
  horizontalLayoutActive: boolean = false;
  private currentDraggableEvent: DragEvent;
  private currentDragEffectMsg: string;
  private readonly verticalLayout = {
    container: "row",
    list: "column",
    dndHorizontal: false
  };
  private readonly horizontalLayout = {
    container: "row",
    list: "row",
    dndHorizontal: true
  };

  constructor(private snackBarService: MatSnackBar) {
    this.setHorizontalLayout(this.horizontalLayoutActive);
  }

  setHorizontalLayout(horizontalLayoutActive: boolean) {
    this.layout = horizontalLayoutActive
      ? this.horizontalLayout
      : this.verticalLayout;
  }

  onDragStart(event: DragEvent) {
    this.currentDragEffectMsg = "";
    this.currentDraggableEvent = event;

    this.snackBarService.dismiss();
    this.snackBarService.open("Drag started!", undefined, { duration: 2000 });
  }

  onDragged(item: any, list: any[], effect: DropEffect) {
    this.currentDragEffectMsg = `Drag ended with effect "${effect}"!`;

    if (effect === "move") {
      const index = list.indexOf(item);
      list.splice(index, 1);
    }
  }

  onDragEnd(event: DragEvent) {
    this.currentDraggableEvent = event;
    this.snackBarService.dismiss();
    this.snackBarService.open(
      this.currentDragEffectMsg || `Drag ended!`,
      undefined,
      { duration: 2000 }
    );
  }

  onDrop(event: DndDropEvent, list?: any[]) {
    if (list && (event.dropEffect === "copy" || event.dropEffect === "move")) {
      let index = event.index;

      if (typeof index === "undefined") {
        index = list.length;
      }

      list.splice(index, 0, event.data);
    }
  }
}

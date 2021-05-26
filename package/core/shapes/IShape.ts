import Konva from "konva";

import { createAsyncKonvaRect, createKonvaRect } from "../konva/createKonvaShapes";

export abstract class IShape {
  public instance: Konva.Shape | null = null;

  public extendOptions: { [key: string]: any } = <any>{};

  public abstract draw(layer: Konva.Layer, config: Konva.ShapeConfig): Konva.Shape;

  public abstract asyncDraw(stage: Konva.Stage, layer: Konva.Layer, config?: Konva.ShapeConfig): Promise<Konva.Shape>;

  public destory() {}

  public add() {}

  public update() {}
}

export class IRect extends IShape {
  public draw = createKonvaRect;

  public asyncDraw = createAsyncKonvaRect;
}

export class ICircle extends IShape {
  public draw(layer: Konva.Layer, config: Konva.ShapeConfig): Konva.Shape {
    throw new Error("Method not implemented.");
  }
  public asyncDraw(stage: Konva.Stage, layer: Konva.Layer, config?: Konva.ShapeConfig): Promise<Konva.Shape> {
    throw new Error("Method not implemented.");
  }
}

import React, { Component, Image } from 'react';
import Canvas, { Image as CanvasImage } from 'react-native-canvas';
import LinkedQueue from '../../objects/LinkedQueue';
import StaticQueue from '../../objects/StaticQueue';
import HashTable from '../../objects/HashTable';

var dataPositionsStaticQueue = [
  { x: 220, y: 210, angle: 0.785398, value: null, color: 'black' },
  { x: 160, y: 260, angle: 1.5708, value: null, color: 'black' },
  { x: 87, y: 260, angle: 2.35619, value: null, color: 'black' },
  { x: 20, y: 210, angle: 3.14159, value: null, color: 'black' },
  { x: 20, y: 130, angle: 3.92699, value: null, color: 'black' },
  { x: 87, y: 70, angle: 4.71239, value: null, color: 'black' },
  { x: 160, y: 70, angle: 5.49779, value: null, color: 'black' },
  { x: 220, y: 130, angle: 6.28319, value: null, color: 'black' },
];

var sizeStaticQueue = 0;

export default class DrawCanvas {
  constructor(canvas, structure) {
    this.structureObj = structure;

    this.arrayElements = [];

    this.squareSize = { width: 40, heigth: 40 };
    this.canvas = canvas;
    this.canvas.height = 300;
    this.canvas.width = 300;

    this.ctx = canvas.getContext('2d');

    this.drawBackgroundCanvas = this.drawBackgroundCanvas.bind(this);
    this.squareInsert = this.squareInsert.bind(this);

    this.insertStaticQueue = this.insertStaticQueue.bind(this);
    this.removeStaticQueue = this.removeStaticQueue.bind(this);
    this.searchStaticQueue = this.searchStaticQueue.bind(this);
    this.clearStaticQueue = this.clearStaticQueue.bind(this);
    this.drawStaticQueue = this.drawStaticQueue.bind(this);

    this.clear = this.clear.bind(this);

    this.clearCanvas = this.clearCanvas.bind(this);
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  insertStaticQueue(valueReceive) {
    if (this.structureObj.insert(valueReceive)) {
      dataPositionsStaticQueue[sizeStaticQueue].value = valueReceive;
      sizeStaticQueue++;
    }
    this.drawStaticQueue();
  }

  drawStaticQueue() {
    alert('a');

    this.clearCanvas();
    var radius = 100;
    var anglePadding = (1 * Math.PI) / 180;

    this.ctx.lineWidth = 90;

    for (var i = 0; i < dataPositionsStaticQueue.length; i++) {
      if (dataPositionsStaticQueue[i].value != null) {
        var startAngle = 0;
        if (i > 0) {
          startAngle = dataPositionsStaticQueue[i - 1].angle;
        }

        this.ctx.strokeStyle = dataPositionsStaticQueue[i].color;
        this.ctx.beginPath();
        this.ctx.arc(
          this.canvas.width / 2,
          this.canvas.height / 2,
          radius,
          startAngle,
          dataPositionsStaticQueue[i].angle - anglePadding
        );
        this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.font = 'bold 40px verdana, sans-serif';
        this.ctx.fillStyle = 'white';

        this.ctx.fillText(
          dataPositionsStaticQueue[i].value,
          dataPositionsStaticQueue[i].x,
          dataPositionsStaticQueue[i].y,
          50
        );
        this.ctx.stroke();
      }
    }
  }

  removeStaticQueue() {
    if (this.structureObj.remove()) {
      dataPositionsStaticQueue[sizeStaticQueue - 1].value = null;
      sizeStaticQueue--;
    }
    this.drawStaticQueue();
  }

  searchStaticQueue(valueReceive) {
    if (this.structureObj.search(valueReceive)) {
      for (var i = 0; i < sizeStaticQueue; i++) {
        if (dataPositionsStaticQueue[i].value == valueReceive) {
          dataPositionsStaticQueue[i].color = 'lightblue';
          break;
        } else dataPositionsStaticQueue[i].color = 'blue';

        setTimeout(function () {
          this.drawStaticQueue();
        }, 5000);
      }
    }
  }
  clearStaticQueue() {
    if (this.structureObj.clear()) {
      for (var i = 0; i < sizeStaticQueue; i++) {
        dataPositionsStaticQueue[i].value = null;
      }
      sizeStaticQueue = 0;
    }
    this.drawStaticQueue();
  }

  drawBackgroundCanvas(posy, posx, width, height) {
    this.ctx.fillRect(posy, posx, width, height);
  }

  draw_square(posx, posy) {
    this.ctx.fillStyle = 'purple';
    this.ctx.fillRect(posx, posy, this.squareSize.width, this.squareSize.height);
    this.atualizeCanvas();
  }

  squareInsert(value) {
    if (this.arrayElements.length == 0) {
      this.draw_square(0, 0);
      this.arrayElements.push({ x: 0, y: 0, valor: value });
    } else {
      let x = this.arrayElements[this.arrayElements.length - 1].x;
      let y = this.arrayElements[this.arrayElements.length - 1].y;
      if (y + this.squareSize.width >= this.canvasSize.width) {
        this.draw_square(
          x + 30,
          y + 30,
          this.squareSize.width,
          this.squareSize.heigth
        );
        this.arrayElements.push({ x: x + 30, y: y + 30, value });
      } else {
        this.draw_square(
          x + 30,
          y,
          this.squareSize.width,
          this.squareSize.heigth
        );
        this.arrayElements.push({ x: x + 30, y: y, value });
      }
    }
    this.atualizeCanvas();
  }

  draw_arrow(context, fromx, fromy, tox, toy) {
    var headlen = 10;
    var dx = tox - fromx;
    var dy = toy - fromy;
    var angle = Math.atan2(dy, dx);
    context.moveTo(fromx, fromy);
    context.lineTo(tox, toy);
    context.lineTo(
      tox - headlen * Math.cos(angle - Math.PI / 6),
      toy - headlen * Math.sin(angle - Math.PI / 6)
    );
    context.moveTo(tox, toy);
    context.lineTo(
      tox - headlen * Math.cos(angle + Math.PI / 6),
      toy - headlen * Math.sin(angle + Math.PI / 6)
    );
  }

  draw_circle(ctx, posy, posx, size) {
    ctx.beginPath();
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 1;
    ctx.arc(posy, posx, size, 0, (Math.PI / 180) * 360, false);
    ctx.stroke();
  }

  insert_ldde(value) {
    if (this.arrayElements > 0) {
      let x = this.arrayElements[this.arrayElements.length - 1].x;
      let y = this.arrayElements[this.arrayElements.length - 1].y;
      draw_new_ldde_node(x, y, value);
    } else {
      draw_new_ldde_node(0, 0, value);
    }
  }

  drawSquareText(posx, posy, key, value) {
    this.ctx.fillStyle = "red";
    this.ctx.fillRect(
      posx,
      posy,
      this.squareSize.width,
      this.squareSize.height
    );
    this.ctx.font = 'bold 20px verdana, sans-serif';
    this.ctx.fillStyle = 'black';
    this.ctx.fillText(key, posx + 5, posy + 2);
    this.ctx.fillText(value, posx + 55, posy + 2);
  }

  insertHash(key, value) {
    if (this.structureObj.insert(key, value)) {
      let hash_key = this.structureObj.hash(key);
      if (this.arrayElements.length == 0) {
        this.drawSquareText(100, 100, 'key', 'value');
        this.drawSquareText(100, 120, key.toString(), value.toString());
        this.arrayElements[hash_key] = {
          x: 100,
          y: 120,
          key: key,
          valor: value,
        };
      } else {
        alert(this.arrayElements[hash_key]);
        if (this.arrayElements[hash_key]) {
          alert(this.arrayElements[hash_key].x)
          alert(this.arrayElements[hash_key].y)
          this.ctx.clearRect(
            this.arrayElements[hash_key].x,
            this.arrayElements[hash_key].y,
            this.arrayElements[hash_key].x + this.squareSize.width * 2,
            this.arrayElements[hash_key].y + this.squareSize.heigth
          );
          this.drawSquareText(
            this.arrayElements[hash_key].x,
            this.arrayElements[hash_key].y,
            key,
            value.toString()
          );
          this.arrayElements[hash_key].valor = value;
        } else {
          let xArray = this.arrayElements[this.arrayElements.length - 1].x;
          let yArray = this.arrayElements[this.arrayElements.length - 1].y;
          this.drawSquareText(xArray, yArray + 40, key, value.toString());
          this.arrayElements[hash_key] = {
            x: xArray,
            y: yArray + 40,
            key: key,
            valor: value,
          };
        }
      }
    }
  }

  clear() {
    if (this.structureObj.clear()) {
      this.arrayElements = [];
      this.clearCanvas();
      alert('structure and canvas was clear');
    }
  }
}

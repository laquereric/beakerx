/*
 *  Copyright 2018 TWO SIGMA OPEN SOURCE, LLC
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

var BeakerXPageObject = require('../beakerx.po.js');
var beakerxPO;

describe('Java widgets test ', function () {

  beforeAll(function () {
    beakerxPO = new BeakerXPageObject();
    beakerxPO.runNotebookByUrl('/test/ipynb/groovy/JavaWidgets4Test.ipynb');
  }, 2);

  afterAll(function () {
    beakerxPO.closeAndHaltNotebook();
  });

  var cellIndex;

  describe('Image widget ', function () {
    var widget;
    it('Cell has Image widget ', function () {
      cellIndex = 0;
      beakerxPO.kernelIdleIcon.waitForEnabled();
      var codeCell = beakerxPO.runCodeCellByIndex(cellIndex);
      widget = codeCell.$('.jupyter-widgets');
      expect(widget.getTagName()).toBe('img');
      expect(widget.getAttribute('class')).toMatch(/widget-image/);
      expect(widget.getAttribute('src')).toMatch('blob:http');
    });
  });

});
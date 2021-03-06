/*
 *  Copyright 2017 TWO SIGMA OPEN SOURCE, LLC
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

import { expect } from 'chai';
import UniqueEntriesHighlighter from "@beakerx/tableDisplay/dataGrid/highlighter/UniqueEntriesHighlighter";
import DataGridColumn from "@beakerx/tableDisplay/dataGrid/column/DataGridColumn";
import highlighterStateMock from "../mock/highlighterStateMock";
import { BeakerXDataGrid } from "@beakerx/tableDisplay/dataGrid/BeakerXDataGrid";
import modelStateMock from "../mock/modelStateMock";
import columnOptionsMock from "../mock/columnOptionsMock";
import cellConfigMock from "../mock/cellConfigMock";
import { HIGHLIGHTER_TYPE } from "@beakerx/tableDisplay/dataGrid/interface/IHighlighterState";
import createStore from "@beakerx/tableDisplay/dataGrid/store/BeakerXDataStore";

describe('UniqueEntriesHighlighter', () => {
  const dataStore = createStore({ ...modelStateMock, types: ['double', 'double']});
  const dataGrid = new BeakerXDataGrid({}, dataStore);
  const column = new DataGridColumn(
    columnOptionsMock,
    dataGrid,
    dataGrid.columnManager
  );

  let uniqueEntriesHighlighter = new UniqueEntriesHighlighter(
    column,
    { ...highlighterStateMock, type: HIGHLIGHTER_TYPE.uniqueEntries }
  );

  it('should be an instance of highlighter', () => {
    expect(uniqueEntriesHighlighter).to.be.an.instanceof(UniqueEntriesHighlighter);
  });

  it('should have the getBackgroundColor method', () => {
    expect(uniqueEntriesHighlighter).to.have.property('getBackgroundColor');
  });

  it('should have the midColor state property', () => {
    expect(uniqueEntriesHighlighter.state).to.have.property('colors');
  });

  it('should return proper backgroud color', () => {
    expect(uniqueEntriesHighlighter.getBackgroundColor(cellConfigMock))
      .to.include('85%, 85%)');
    expect(uniqueEntriesHighlighter.getBackgroundColor({ ...cellConfigMock, value: 0 }))
      .to.include('85%, 85%)');
    expect(uniqueEntriesHighlighter.getBackgroundColor({ ...cellConfigMock, value: 0.5 }))
      .to.equal('');
  });
});

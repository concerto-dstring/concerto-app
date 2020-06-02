/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * @providesModule columnActions
 */

'use strict';

import {
    CELL_EDIT_START,
    CELL_EDIT_END,
} from './ActionTypes';

/**
 * Initiates cell editing
 *
 * @param {{rowIndex: number, columnKey: string}} editData
 */
export const startCellEdit = (editData) => ({
    type: CELL_EDIT_START,
    editData,
});

/**
 * Stops cell editing
 */
export const endCellEdit = () => ({
    type: CELL_EDIT_END,
});

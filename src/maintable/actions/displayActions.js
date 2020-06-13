/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * @providesModule displayActions
 */

'use strict';

import {
    HEIGHT_INCREASE
} from './ActionTypes';

/**
 * Initiates cell editing
 *
 * @param {{rowIndex: number, columnKey: string}} editData
 */
export const adjustHeight = (increase) => ({
    type: HEIGHT_INCREASE,
    increase,
});

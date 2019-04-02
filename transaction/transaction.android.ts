/*! *****************************************************************************
Copyright (c) 2019 Tangra Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
***************************************************************************** */

import { TransactionBase, TransactionState } from "./transaction-common";

export * from "./transaction-common";

export class Transaction extends TransactionBase {

    constructor(nativeValue: org.json.JSONObject) {
        super(nativeValue);
        
        if (nativeValue) {
            switch (nativeValue.getInt("purchaseState")) {
                case 0:
                    this.transactionState = TransactionState.Purchased;
                    break;

                case 1:
                    this.transactionState = TransactionState.Failed;
                    break;

                case 2:
                    this.transactionState = TransactionState.Refunded;
                    break;
            }

            this.productIdentifier = nativeValue.getString("productId");
            this.transactionReceipt = nativeValue.getString("purchaseToken");
            if (nativeValue.has("signature")) {
                this.dataSignature = nativeValue.getString("signature");
            }
            if (nativeValue.has("orderId")) {
                this.transactionIdentifier = nativeValue.getString("orderId");
            }
            if (nativeValue.has("developerPayload")) {
                this.developerPayload = nativeValue.getString("developerPayload");
            }
            if (nativeValue.getLong("purchaseTime")) {
                this.transactionDate = new Date(nativeValue.getLong("purchaseTime"));
            }
        }
    }
} 
# UI Design Coverage

Surfaces: 1
Design matrix rows: 4
Review rows: 16

## Design Matrix

| Widget | Platform | Viewport | Density | Component | Status | States | Review |
| --- | --- | --- | --- | --- | --- | --- | --- |
| widget_data_grid | android | any | unspecified | company.itemCards | unsupported | (none) | review_required |
| widget_data_grid | ios | any | unspecified | company.itemList | implementation_owned | (none) | review_required |
| widget_data_grid | web | narrow | unspecified | company.dataCards | contract_only | (none) | review_required |
| widget_data_grid | web | wide | unspecified | company.dataGrid | rendered | (none) | review_required |

## Review Work

| Code | Widget | Platform | Component | Message |
| --- | --- | --- | --- | --- |
| design_behavior_review_required | widget_data_grid | android | company.itemCards | Behavior 'sorting' is 'unsupported'. |
| design_missing_state | widget_data_grid | android | company.itemCards | Realization 'data_cards_android' does not declare 'loading' state coverage. |
| design_missing_state | widget_data_grid | android | company.itemCards | Realization 'data_cards_android' does not declare 'empty' state coverage. |
| design_missing_state | widget_data_grid | android | company.itemCards | Realization 'data_cards_android' does not declare 'error' state coverage. |
| design_realization_status_review | widget_data_grid | android | company.itemCards | Realization 'data_cards_android' is 'unsupported'. |
| design_missing_state | widget_data_grid | ios | company.itemList | Realization 'data_list_ios' does not declare 'loading' state coverage. |
| design_missing_state | widget_data_grid | ios | company.itemList | Realization 'data_list_ios' does not declare 'empty' state coverage. |
| design_missing_state | widget_data_grid | ios | company.itemList | Realization 'data_list_ios' does not declare 'error' state coverage. |
| design_behavior_review_required | widget_data_grid | web | company.dataGrid | Behavior 'sorting' is 'contract_only'. |
| design_missing_state | widget_data_grid | web | company.dataCards | Realization 'data_cards_narrow' does not declare 'loading' state coverage. |
| design_missing_state | widget_data_grid | web | company.dataCards | Realization 'data_cards_narrow' does not declare 'empty' state coverage. |
| design_missing_state | widget_data_grid | web | company.dataCards | Realization 'data_cards_narrow' does not declare 'error' state coverage. |
| design_missing_state | widget_data_grid | web | company.dataGrid | Realization 'data_grid_wide' does not declare 'loading' state coverage. |
| design_missing_state | widget_data_grid | web | company.dataGrid | Realization 'data_grid_wide' does not declare 'empty' state coverage. |
| design_missing_state | widget_data_grid | web | company.dataGrid | Realization 'data_grid_wide' does not declare 'error' state coverage. |
| design_realization_status_review | widget_data_grid | web | company.dataCards | Realization 'data_cards_narrow' is 'contract_only'. |

## Next Commands

- `topogram query ui-design-coverage ./topo --projection proj_web_surface --json`
- `topogram emit ui-realization-report ./topo --projection proj_web_surface --json`
- `topogram widget check ./topo --json`

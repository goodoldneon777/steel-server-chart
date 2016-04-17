/*
This file mimics a database.
*/

package main

import (
    _ "github.com/go-sql-driver/mysql"
    "database/sql"
)

// Give us some seed data
func FieldChooseFiltersBuild() FieldChooseFilterOutputJSON {
    var items []FieldChooseFilter
    var item FieldChooseFilter
    var options []FieldChooseFilterDropdownOption
    var option FieldChooseFilterDropdownOption
    var name_id string
    var option_text string
    var option_value string
    var output FieldChooseFilterOutputJSON


    query := `
        SELECT i.name_id, o.option_text, o.option_value
        FROM param_input as i
        INNER JOIN param_dropdown_option as o
            ON i.name_id = o.name_id
        LEFT OUTER JOIN param_input_child as c
            ON o.option_value = c.option_value
        WHERE i.type = 'field_filter'
            AND i.name_id = 'filter_operator'
        ORDER BY o.name_id asc, o.order_num asc, c.order_num asc
    `
    
    //Connect to the data_chart database.
    db, err := sql.Open("mysql", "root:steel87@/data_chart")
    if err != nil {
        panic(err.Error()) // Just for example purpose. You should use proper error handling instead of panic
    }

    //Run the query.
    rows, err := db.Query(query)
    if err != nil {
        panic(err.Error()) // proper error handling instead of panic in your app
    }

    //Loop thru the query recordset.
    for rows.Next() {
        rows.Scan(&name_id, &option_text, &option_value)    //Assign row data to variables.        


        // option = nil
        option.Text = option_text
        option.Value = option_value

        options = append(options, option)
    }


    item.Type = "fieldChooseFilter"
    item.Id = 1
    item.Attributes.Name = name_id
    item.Attributes.Options = options
    items = append(items, item) //Add the current item to the output array.

    output.Data = items

 
    return output
}
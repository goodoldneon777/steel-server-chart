/*
This file mimics a database.
*/

package main

import (
    _ "github.com/go-sql-driver/mysql"
    "database/sql"
    // "log"
)

// Give us some seed data
func FieldChooseSelectsBuild(filterName string) OutputJSON {
    var items Items
    var item Item
    var options Options
    var option Option
    var child string
    var prevNameId string
    var prevOptionValue string
    var output OutputJSON

    hasResults := false
    currentId := 1


    query := `
        SELECT o.name_id, o.option_text, o.option_value, o.show_in_yaxis_flag, o.show_in_xaxis_flag, o.show_in_filters_flag, o.show_filter_flag, c.child_name_id
        FROM param_input as i
        INNER JOIN param_dropdown_option as o
            ON i.name_id = o.name_id
        LEFT OUTER JOIN param_input_child as c
            ON o.option_value = c.option_value
        WHERE i.type = 'field_select'
    `

    if (filterName != "") {
        query += " AND i.name_id = '" + filterName + "'"
    }

    query += " ORDER BY o.name_id asc, o.order_num asc, c.order_num asc"
    

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
        hasResults = true

        var name_id string          //Clear on each iteration.
        var option_text string      //Clear on each iteration.
        var option_value string     //Clear on each iteration.
        var show_in_yaxis_flag int  //Clear on each iteration.
        var show_in_xaxis_flag int  //Clear on each iteration.
        var show_in_filters_flag int  //Clear on each iteration.
        var show_filter_flag int    //Clear on each iteration.
        var child_name_id string    //Clear on each iteration.
        rows.Scan(&name_id, &option_text, &option_value, &show_in_yaxis_flag, &show_in_xaxis_flag, &show_in_filters_flag, &show_filter_flag, &child_name_id)    //Assign row data to variables.        


        //If the loop has gotten to a new dropdown (i.e. a new name_id), then we want to "add" the previous dropdown we were building.
        if name_id != prevNameId  &&  len(prevNameId) > 0 {    
            options = append(options, option)
            item.Attributes.Options = options
            items = append(items, item) //Add the current item to the output array.

            currentId += 1

            options = nil
            option.Children = nil
        } else {
            if option_value != prevOptionValue  &&  len(prevOptionValue) > 0 {    //If the loop has gotten to a new dropdown (new name_id).\
                options = append(options, option)   //Add the current option to the option array.
                option.Children = nil
            }
        }

        child = child_name_id

        option.Text = option_text
        option.Value = option_value
        
        if show_in_yaxis_flag == 1 {
            option.YAxisEnable = true
        } else {
            option.YAxisEnable = false
        }

        if show_in_xaxis_flag == 1 {
            option.XAxisEnable = true
        } else {
            option.XAxisEnable = false
        }

        if show_in_filters_flag == 1 {
            option.ShowInFilters = true
        } else {
            option.ShowInFilters = false
        }

        if show_filter_flag == 1 {
            option.FilterEnable = true
        } else {
            option.FilterEnable = false
        }

        if len(child) > 0 {
            option.Children = append(option.Children, child)
        }

        item.Id = currentId
        item.Type = "fieldChooseSelects"
        item.Attributes.Name = name_id
        item.Attributes.Options = options

        prevNameId = name_id  //The current name_id will be prevNameId on the next iteration.
        prevOptionValue = option_value
    }

    if hasResults {
        options = append(options, option)
        item.Attributes.Options = options
        items = append(items, item) //Add the current item to the output array.

        output.Data = items
    } else {
        output.Data = nil
    }


    return output
}
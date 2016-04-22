package main

// import "time"

// type Dropdown struct {
//     Id        int       `json:"id"`
//     Name      string    `json:"name"`
//     Completed bool      `json:"completed"`
//     Due       time.Time `json:"due"`
// }

// type Dropdowns []Dropdown

type Item struct {
    Type string `json:"type"`
    Id int `json:"id"`
    Attributes Dropdown `json:"attributes"`
}

type Dropdown struct {
    Name 	string 		`json:"name"`
    Options []Option 	`json:"options"`
}

type Option struct {
    Text string `json:"text"`
    Value string `json:"value"`
    YAxisEnable bool `json:"yAxisEnable"`
    XAxisEnable bool `json:"xAxisEnable"`
    ShowInFilters bool `json:"showInFilters"`
    FilterEnable bool `json:"filterEnable"`
    Children []string `json:"children"`
}

type Items []Item

type Options []Option

type OutputJSON struct {
	Data Items `json:"data"`
}



type FieldChooseFilterOutputJSON struct {
    Data []FieldChooseFilter `json:"data"`
}

type FieldChooseFilter struct {
    Type string `json:"type"`
    Id int `json:"id"`
    Attributes FieldChooseFilterDropdown `json:"attributes"`
}

type FieldChooseFilterDropdown struct {
    Name    string      `json:"name"`
    Options []FieldChooseFilterDropdownOption    `json:"options"`
}

type FieldChooseFilterDropdownOption struct {
    Text string `json:"text"`
    Value string `json:"value"`
}

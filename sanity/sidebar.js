import React from "react";
import S from "@sanity/desk-tool/structure-builder";

// build a custom sidebar
export default function Sidebar() {
  return S.list()
    .title(`Slick's Slices`)
    .items([
      // create new sub items
      S.listItem()
        .title("Home Page")
        .icon(() => <strong>🔥</strong>)
        .child(
          S.editor()
            // Inherit from storeSettings
            .schemaType("storeSettings")
            // Set custom document id
            .documentId("downtown")
        ),
      // Display other schemas
      // Filtered out storeSettings -> can only edit
      // through HomePage
      ...S.documentTypeListItems().filter(
        (item) => item.getId() !== "storeSettings"
      ),
    ]);
}

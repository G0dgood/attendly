"use client"

import Header from "@/components/Header";
import SideNav from "@/components/SideNav";
import React, { useState } from "react";



function Layout({ children }: never) {


  return (
    <div id="page-wrapper">
      <Header />
      <SideNav />
      <main>{children}</main>
    </div>
  );
}

export default Layout;

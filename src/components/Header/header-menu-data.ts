import data from "./header-menus.json";
import type { IndustryMenuItem, MenuItem } from "./menu-types";

export const COMPANY_MENU = data.COMPANY_MENU as (MenuItem & { description: string })[];

export const INDUSTRIES_MENU = data.INDUSTRIES_MENU as IndustryMenuItem[];

export const PRODUCTS_MENU = data.PRODUCTS_MENU as MenuItem[];

export const RESOURCES_MENU = data.RESOURCES_MENU as (MenuItem & { description: string })[];

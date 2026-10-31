import { catalogHandlers } from './catalogHandlers';
import { homeHandlers } from './homeHandlers';
import { siteHandlers } from './siteHandlers';

export const handlers = [...siteHandlers, ...homeHandlers, ...catalogHandlers];

import type { ColumnSort, Row } from "@tanstack/react-table";

import { type DataTableConfig } from "@/config/data-table";
import { type filterSchema } from "@/lib/parsers";
import { z } from "zod";

export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export type StringKeyOf<TData> = Extract<keyof TData, string>;

export interface SearchParams {
  [key: string]: string | string[] | undefined;
}

export interface Option {
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
  count?: number;
}

export interface ExtendedColumnSort<TData> extends Omit<ColumnSort, "id"> {
  id: StringKeyOf<TData>;
}

export type ExtendedSortingState<TData> = ExtendedColumnSort<TData>[];

export type ColumnType = DataTableConfig["columnTypes"][number];

export type FilterOperator = DataTableConfig["globalOperators"][number];

export type JoinOperator = DataTableConfig["joinOperators"][number]["value"];

export interface DataTableFilterField<TData> {
  id: StringKeyOf<TData>;
  label: string;
  placeholder?: string;
  options?: Option[];
}

export interface DataTableAdvancedFilterField<TData>
  extends DataTableFilterField<TData> {
  type: ColumnType;
}

export type Filter<TData> = Prettify<
  Omit<z.infer<typeof filterSchema>, "id"> & {
    id: StringKeyOf<TData>;
  }
>;

export interface DataTableRowAction<TData> {
  row: Row<TData>;
  type: "update" | "delete";
}

export interface QueryBuilderOpts {
  where?: any;
  orderBy?: any;
  distinct?: boolean;
  nullish?: boolean;
}

export interface GithubRepository {
  id: number;
  name: string;
  owner: string;
  fullName: string;
  description: string | null;
  private: boolean;
  language: string | null;
}

export interface Repository {
  id: string;
  repoName: string;
  owner: string;
  prCount: number;
  lastSync: string;
  status: string;
}

export interface PullRequest {
  id: number;
  title: string;
  repoName: string;
  state: string;
  createdAt: string;
  updatedAt: string;
  author: string;
  description: string;
}

export interface INotification {
  id: string;
  userId: string;
  message: string;
  type: "info" | "success" | "error" | "warning";
  read: boolean;
  createdAt: string;
}

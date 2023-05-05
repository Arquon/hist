import React, { type FC } from "react";
import { CustomButton } from "@/components/UI/CustomButton";
import { EPromiseStatuses, useMockData } from "@/hooks/useMockData";
import { NarrowContainer } from "@/components/UI/Common";

function getStatus(status: EPromiseStatuses): string {
   switch (status) {
      case EPromiseStatuses.idle:
         return "Ожидание загрузки";
      case EPromiseStatuses.pending:
         return "Загрузка";
      case EPromiseStatuses.succeed:
         return "Все файлы загружены";
      case EPromiseStatuses.error:
         return "Ошибка при  загрузке";
   }
}

interface InitializeProps {}

export const Initialize: FC<InitializeProps> = ({}) => {
   const { count, percentage, status, initializeMockData } = useMockData();

   return (
      <section className="initialize-page">
         <NarrowContainer className="initialize-page__container">
            <CustomButton onClick={initializeMockData}>Инициализировать новости</CustomButton>
            <ul>
               <li>Текущий статус: {getStatus(status)}</li>
               <li>Процентаж: {percentage}%</li>
               <li>Количество загрженных объектов: {count}</li>
            </ul>
         </NarrowContainer>
      </section>
   );
};
